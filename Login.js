import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    if (isRegister) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(doc(db, 'users', user.uid), { email, balance: 100000, freeSpins: 100 });
          setUser({ email, balance: 100000 });
          localStorage.setItem('user', user.uid);
          localStorage.setItem('balance', 100000);
          alert('Реєстрація успішна! Отримайте 100 фріспінів!');
          navigate('/casino');
        })
        .catch((error) => alert(error.message));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser({ email, balance: localStorage.getItem('balance') || 100000 });
          localStorage.setItem('user', user.uid);
          navigate('/casino');
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <section className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isRegister ? 'Реєстрація' : 'Увійти'}</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 m-2 bg-gray-900 text-white rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="p-2 m-2 bg-gray-900 text-white rounded w-full"
        />
        <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded m-2">
          {isRegister ? 'Зареєструватися' : 'Увійти'}
        </button>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="text-yellow-500 hover:underline m-2"
        >
          {isRegister ? 'Увійти' : 'Зареєструватися'}
        </button>
      </form>
    </section>
  );
}

export default Login;