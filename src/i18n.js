import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "ru", "it"],
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          signIn: "Sign In",
          toSignIn: "sing in",

          signUp: "Sign Up",
          toSignUp: "sing up",
          signIntoAccount: "Sign in into an account",
          createAccount: "Create an account",

          email: "Email",
          emailPlaceholder: "Enter email",
          password: "Password",
          passwordPlaceholder: "Enter password",

          enterFields:
            "Enter your email and password to {{sign}} into this app",

          emailNotValid: "Email is not valid",
          shortPassword: "Password must be at least 8 characters",
          longPassword: "Password cannot exceed 14 characters",
          passwordContainNumber: "Password must contain at least one number",
          strongPassword: "Your password is strong",

          dontHaveAccount: "Don't have an account?",
          alreadyHaveAccount: "Already have an account?",
          forgotToCreate: "Forgot to create an account?",

          termsAgreement: "By clicking continue, you agree to our",
          termsOfService: "Terms of Service",
          and: "and",
          privacyPolicy: "Privacy Policy",

          whatHappening: "What’s happening?",
          tellEveryone: "Tell everyone",

          like_one: "{{count}} like",
          like_other: "{{count}} likes",
          like_zero: "no likes",

          comment_one: "{{count}} comment",
          comment_other: "{{count}} comments",
          comment_zero: "no comments",
          hiddenComments: "You have to login to see the comments",
          addAComment: "Add a comment",
          addCommentPlaceholder: "Write description here...",

          time: {
            now: "now",
            minute: "{{count}}m ago",
            hour: "{{count}}h ago",
            day: "{{count}}d ago",
            week: "{{count}}w ago",
            month: "{{count}}mth ago",
            fullDate: "{{date}}",
          },

          createPost: "Create a new post",
          postTitle: "Post title",
          postTitlePlaceholder: "Enter post title",
          description: "description",
          descriptionPlaceholder: "Write description here...",
          selectFile: "Select a file or drag and drop here",
          imagePlaceholder: "JPG, PNG or PDF, file size no more than 10MB",
          imageMaxSize: "Max allowed size is 10MB",
          create: "Create",

          titleRequired: "Title is required",
          titleToLong: "Max 20 characters",
          contentToLong: "Max 200 characters",
          wrongFileFormat: "Unsupported file format",

          preferences: "Preferences",

          theme: {
            dark: "Dark theme",
            light: "Light theme",
          },
          actions: "Actions",
          logOut: "Logout",
          editProfile: "Edit profile",
          changeProfilePhoto: "Change profile photo",
          username: "Username",
        },
      },
      ru: {
        translation: {
          signUp: "Регистрация",
          toSignUp: "зарегистрироваться",
          signIn: "Вход",
          toSignIn: "войти",
          signIntoAccount: "Войти в аккаунт",
          createAccount: "Создать аккаунт",

          email: "Электронная почта",
          emailPlaceholder: "Введите почту",
          password: "Пароль",
          passwordPlaceholder: "Введите пароль",

          enterFields:
            "Введите вашу почту и пароль, чтобы {{sign}} в эт{{appPreposition}} приложение",

          emailNotValid: "Email некорректный",
          shortPassword: "Пароль должен содержать минимум 8 символов",
          longPassword: "Пароль не может превышать 14 символов",
          passwordContainNumber: "Пароль должен содержать хотя бы одну цифру",
          strongPassword: "Ваш пароль надежный",

          dontHaveAccount: "Нет аккаунта?",
          alreadyHaveAccount: "Уже есть аккаунт?",
          forgotToCreate: "Забыли создать аккаунт?",

          termsAgreement: "Нажимая продолжить, вы соглашаетесь с",
          termsOfService: "Условиями использования",
          and: "и",
          privacyPolicy: "Политикой конфиденциальности",

          whatHappening: "Что происходит?",
          tellEveryone: "Расскажите всем",

          like_one: "{{count}} лайк",
          like_few: "{{count}} лайка",
          like_many: "{{count}} лайков",
          like_zero: "нет лайков",

          comment_one: "{{count}} комментарий",
          comment_few: "{{count}} комментария",
          comment_many: "{{count}} комментариев",
          comment_zero: "нет комментариев",
          hiddenComments: "Войдите, чтобы видеть комментарии",
          addAComment: "Добавить комментарий",
          addCommentPlaceholder: "Напишите описание здесь...",

          time: {
            now: "только что",
            minute: "{{count}} мин назад",
            hour: "{{count}} ч назад",
            day: "{{count}} д назад",
            week: "{{count}} нед назад",
            month: "{{count}} мес назад",
            fullDate: "{{date}}",
          },
          createPost: "Создать новый пост",
          postTitle: "Заголовок поста",
          postTitlePlaceholder: "Введите заголовок поста",
          description: "Описание",
          descriptionPlaceholder: "Напишите описание здесь...",
          selectFile: "Выберите файл или перетащите его сюда",
          imagePlaceholder: "JPG, PNG или PDF, размер файла не более 10 МБ",
          imageMaxSize: "Максимальный размер файла — 10 МБ",
          create: "Создать",

          titleRequired: "Заголовок обязателен",
          titleTooLong: "Заголовок не должен превышать 20 символов",
          contentTooLong: "Описание не должно превышать 200 символов",
          wrongFileFormat:
            "Неподдерживаемый формат файла. Загрузите JPG, PNG или PDF",

          preferences: "",
        },
      },
      it: {
        translation: {
          signUp: "Registrati",
          signIn: "Accedi",
          signIntoAccount: "Accedi al tuo account",
          createAccount: "Crea un account",

          email: "Email",
          emailPlaceholder: "Inserisci email",
          password: "Password",
          passwordPlaceholder: "Inserisci password",

          enterFields:
            "Inserisci la tua email e password per {{sign}} in questa app",

          emailNotValid: "L'email non è valida",
          shortPassword: "La password deve contenere almeno 8 caratteri",
          longPassword: "La password non può superare i 14 caratteri",
          passwordContainNumber: "La password deve contenere almeno un numero",
          strongPassword: "La tua password è sicura",

          dontHaveAccount: "Non hai un account?",
          alreadyHaveAccount: "Hai già un account?",
          forgotToCreate: "Hai dimenticato di creare un account?",

          termsAgreement: "Cliccando continua, accetti i nostri",
          termsOfService: "Termini di servizio",
          and: "e",
          privacyPolicy: "Informativa sulla privacy",

          whatHappening: "Cosa sta succedendo?",
          tellEveryone: "Dillo a tutti",

          like_one: "{{count}} like",
          like_other: "{{count}} likes",
          like_zero: "nessun like",

          comment_one: "{{count}} commento",
          comment_other: "{{count}} commenti",
          comment_zero: "nessun commento",
          hiddenComments: "Devi accedere per vedere i commenti",
          addAComment: "Aggiungi un commento",
          addCommentPlaceholder: "Scrivi qui la descrizione...",

          time: {
            now: "ora",
            minute: "{{count}} min fa",
            hour: "{{count}} h fa",
            day: "{{count}} g fa",
            week: "{{count}} sett fa",
            month: "{{count}} mesi fa",
            fullDate: "{{date}}",
          },

          createPost: "Crea un nuovo post",
          postTitle: "Titolo del post",
          postTitlePlaceholder: "Inserisci il titolo del post",
          description: "Descrizione",
          descriptionPlaceholder: "Scrivi qui la descrizione...",
          selectFile: "Seleziona un file o trascinalo qui",
          imagePlaceholder: "JPG, PNG o PDF, dimensione massima 10 MB",
          imageMaxSize: "Dimensione massima consentita 10 MB",
          create: "Crea",

          titleRequired: "Il titolo è obbligatorio",
          titleTooLong: "Il titolo non può superare i 20 caratteri",
          contentTooLong: "La descrizione non può superare i 200 caratteri",
          wrongFileFormat: "Formato file non supportato. Carica JPG, PNG o PDF",
        },
      },
    },
  });
