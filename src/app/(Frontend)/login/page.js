'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Home, Visibility, VisibilityOff } from '@mui/icons-material';
import Input from '@/Components/Input/Input';
import Button from '@/Components/Button/Button';

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [disabledBtn, setDisabledBtn] = useState(true);

  const pattern = /[^@s]+@[^@s]+.[^@s]+/;

  const submit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setCredentials((prev) => {
      const newCredentials = { ...prev, [e.target.name]: e.target.value };
      return newCredentials;
    });
  };

  useEffect(() => {
    if (
      credentials.email !== '' &&
      credentials.password !== '' &&
      pattern.test(credentials.email)
    ) {
      setDisabledBtn(false);
    }
  }, [credentials]);

  return (
    <div className="flex items-center justify-center h-[100vh] h-[100dvh]">
      <div
        className="sm:relative absolute sm:top-0 sm:right-0 sm:left-0 sm:right-0 flex flex-col sm:rounded-[12px] p-[25px] sm:min-h-[250px] sm:min-w-[250px] sm:max-h-[520px] sm:max-w-[520px] h-full w-full items-center justify-center bg-white min-w-500 sm:rounded-2.5 shadow-md "
        style={{ height: '100dvh' }}
      >
        <Image
          src={require('/src/assets/Images/Rayab.png')}
          alt="Logo"
          loading="lazy"
          placeholder="blur"
          width={200}
          className="mb-[40px]"
        />
        <form className="min-w-[180px] max-w-[320px] w-full" onSubmit={submit}>
          <Input
            label={'Email Id'}
            type={'text'}
            name={'email'}
            onChange={onChange}
            value={credentials.email}
            pattern={'[^@s]+@[^@s]+.[^@s]+'}
          />
          <Input
            label={'Password'}
            type={showPw ? 'text' : 'password'}
            name={'password'}
            showPw={showPw}
            setShowPw={setShowPw}
            onChange={onChange}
            value={credentials.password}
          />

          <Button type={'submit'} name={'Login'} disabled={disabledBtn} />
        </form>
      </div>
    </div>
  );
};

export default Login;
