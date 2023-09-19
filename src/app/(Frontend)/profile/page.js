'use client';
import Button from '@/Components/Button/Button';
import FullScreenLoader from '@/Components/FullScreenLoader/FullScreenLoader';
import Input from '@/Components/Input/Input';
import { urls } from '@/app/constants/constants';
import makeHttpRequest from '@/app/services/apiCall';
import { AccountCircle } from '@mui/icons-material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [password, setPassword] = useState({ oldPw: '', newPw: '', cPw: '' });
  const [passLoading, setPassLoading] = useState(false);

  const profile = () => {
    makeHttpRequest(`${urls.profile}`, 'get')
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res?.data?.data) {
            setData(res?.data?.data);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    profile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitPw = () => {
    if (password.oldPw !== '' && password.newPw !== '' && password.cPw !== '') {
      if (password.newPw === password.cPw) {
        setPassLoading(true);
        makeHttpRequest(`${urls.changePassword}`, 'patch', password)
          .then((res) => {
            setPassLoading(false);
            if (res.status === 200) {
              if (res?.data?.data) {
                alert(res?.data?.message);
              }
            }
          })
          .catch((err) => {
            setPassLoading(false);
            if (err?.message) {
              alert(err?.message);
            }
          });
      } else {
        alert('Passwords are not Matching');
      }
    } else {
      alert('Enter all the fields');
    }
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] ">
      <div className="ml-[25px] mr-[20px] relative mb-[25px]">
        <div className="flex flex-col">
          <div className="text-[28px] font-bold">Profile Page</div>
          <div className=" bg-white rounded-[16px] shadow-md my-[20px] p-[20px] flex items-center flex-wrap gap-[18px]">
            <AccountCircle
              sx={{ fontSize: '150px', color: 'slate', opacity: '0.4' }}
            />
            <div>
              <div>
                {data.username && (
                  <span className="text-[28px]">{data.username}</span>
                )}
              </div>
              <div>
                {data.firstName && <span>{data.firstName}</span>}{' '}
                {data.lastName && <span>{data.lastName}</span>}
              </div>
              <div className="text-slate-400">
                {data.email && <span>{data.email}</span>}
              </div>
              {data.isAdmin && <div className="text-[#e47e52]">Admin</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-[25px] mr-[20px] relative mb-[25px]">
        <div className="flex flex-col">
          <div className=" bg-white rounded-[16px] shadow-md my-[20px] p-[20px] flex items-center flex-wrap gap-[18px]">
            <div className="max-w-[320px] w-full min-w-[220px]">
              <Input
                label={'Old Password'}
                type={showPw ? 'text' : 'password'}
                showPw={showPw}
                setShowPw={setShowPw}
                typePassword
                name={'oldPw'}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-[320px] w-full min-w-[220px]">
              <Input
                label={'New Password'}
                type={showPw ? 'text' : 'password'}
                showPw={showPw}
                setShowPw={setShowPw}
                typePassword
                name={'newPw'}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-[320px] w-full min-w-[220px]">
              <Input
                label={'Confirm Password'}
                type={showPw ? 'text' : 'password'}
                showPw={showPw}
                setShowPw={setShowPw}
                typePassword
                name={'cPw'}
                onChange={handleChange}
              />
            </div>
            <div className="w-[100px]">
              <Button
                styles={{ height: '38px', marginTop: '6px' }}
                name={'Save'}
                onClick={submitPw}
                type={'button'}
              />
            </div>
          </div>
        </div>
      </div>
      <FullScreenLoader open={passLoading} />
    </div>
  );
};

export default Page;
