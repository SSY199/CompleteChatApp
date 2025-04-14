import React from "react";
import Background from "../assets/login2.png";
import Victory from "../assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import apiclient from "@/lib/apiclient.js";
import { LOGIN_ROUTES } from "../utils/constants.js";
import { SIGNUP_ROUTES } from"../utils/constants.js";
import { useAppStore } from "../store/store.js";


const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignUp = () => {
    if (!email.length) {
      toast.error('Email is required.');
      return false;
    }
    if (!password.length) {
      toast.error('Password is required.');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password should be same.');
      return false;
    }
    return true;
  }

  const validatelogin = () => {
    if (!email.length) {
      toast.error('Email is required.');
      return false;
    }
    if (!password.length) {
      toast.error('Password is required.');
      return false;
    }
    return true;
  }

  // const handleLogin = async () => {
  //   if (validatelogin()) {
  //     try {
  //       const res = await apiclient.post(LOGIN_ROUTES, { email, password }, { withCredentials: true });
  //       console.log('API Response:', res.data); // Log the response to see its structure

  //       if (res.data.user._id) {
  //         console.log('User ID:', res.data.user._id);
  //         if (res.data.user.profileSetup) {
  //           console.log('Navigating to /chat');
  //           navigate('/chat');
  //         } else {
  //           console.log('Navigating to /profile');
  //           navigate('/profile');
  //         }
  //       } else {
  //         toast.error('Login failed. Please try again.');
  //       }
  //     } catch (error) {
  //       console.error('Login error:', error);
  //       toast.error('An error occurred during login.');
  //     }
  //   }
  // };

  const handleLogin = async () => {
    if (validatelogin()) {
      try {
        const res = await apiclient.post(LOGIN_ROUTES, { email, password }, { withCredentials: true });
        console.log('API Response:', res.data); // Log the response to see its structure
  
        if (res.data.user.id) { // Change _id to id
          // 
          setUserInfo(res.data.user);
          if (res.data.user.profileSetup) {
            console.log('Navigating to /chat');
            navigate('/chat');
          } else {
            console.log('Navigating to /profile');
            navigate('/profile');
          }
        } else {
          toast.error('Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error('An error occurred during login.');
      }
    }
  };

  const handleSignup = async () => {
    if (validateSignUp()) {
      try {
        const res = await apiclient.post(SIGNUP_ROUTES, { email, password }, { withCredentials: true });
        if (res.status === 201) {
          setUserInfo(res.data.user);
          navigate("/profile");
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="text-center font-semibold">
              Fill in the details to get started with the best Chat App!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger value="login" className="border-b-2 w-full p-3 transition-all duration-300 font-semibold text-gray-700 data-[state=active]:border-purple-500">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="border-b-2 w-full p-3 transition-all duration-300 font-semibold text-gray-700 data-[state=active]:border-purple-500">
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input placeholder="Email" type="email" className="mt-5 rounded-lg p-4 border" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" className="rounded-lg p-4 border" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin} className="rounded-lg p-4 bg-purple-500 text-white hover:bg-purple-600">
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input placeholder="Email" type="email" className="rounded-lg p-4 border" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" className="rounded-lg p-4 border" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input placeholder="Confirm Password" type="password" className="rounded-lg p-4 border" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button onClick={handleSignup} className="rounded-lg p-4 bg-purple-500 text-white hover:bg-purple-600">
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-center">
          <img src={Background} alt="Background" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
