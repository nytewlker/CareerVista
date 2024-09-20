import React, { useState } from "react";
import ForgetPasswordForm from "./ForgetPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

const PasswordResetFlow = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  return (
    <div>
      {!userId ? (
        <ForgetPasswordForm setUserId={setUserId} setRole={setRole} />
      ) : (
        <ResetPasswordForm userId={userId} role={role} />
      )}
    </div>
  );
};

export default PasswordResetFlow;
