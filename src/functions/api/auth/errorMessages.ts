import { AuthErrors } from "@/types/enums/authErrors";

export const getLoginErrorMessage = (error?: string) => {
  switch (error as AuthErrors) {
    case AuthErrors.InvalidCredentials:
      return "Por favor, informe email e senha para continuar.";
    case AuthErrors.CredentialsSignin:
      return "Usuário ou senha inválidos";
    case AuthErrors.SessionRequired:
      return "Você precisa estar logado para acessar esta página";
    case AuthErrors.EmailNotVerified:
      return "Usuário ainda não foi ativado. Verifique seu email de confirmação.";
    default:
      return null;
  }
};

export const getRegisterErrorMessage = (error?: string) => {
  switch (error as AuthErrors) {
    case AuthErrors.CONFLICT:
      return "Usuário já cadastrado com esse email.";
    default:
      return null;
  }
};

export const recoverErrorMessage =
  "Email de recuperação de senha enviado com sucesso";
