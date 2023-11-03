"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "@/redux/features/globalSlice";
import { getCurrCandidate } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCurrEmployer } from "@/redux/features/employer/api";
const initialLoad = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { currUser, userRole, isAuthenticated } = useAppSelector(
    (s) => s.persistedReducer.user
  );
  const { socket } = useAppSelector((s) => s.global);
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_ENDPOINT;

  useEffect(() => {
    // getCurr user
    if (currUser && isAuthenticated) {
      if (userRole === "candidate") getCurrCandidate(dispatch, currUser);
      else if (userRole === "employer") getCurrEmployer(dispatch, currUser);
    }

    // connect to socket
    if (socketUrl) {
      const socket = io(socketUrl);
      dispatch(setSocket(socket));
    }
  }, []);

  useEffect(() => {
    socket?.emit("newUser", currUser);
  }, [socket, currUser]);

  return children;
};

export default initialLoad;
