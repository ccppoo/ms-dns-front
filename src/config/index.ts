import type { Notifications } from "./types"
import isMobile from "@/utils/is-mobile"

const title = "ForzaWeek"
const email = "example@example.com"
const messages = {
  app: {
    crash: {
      title: "Oooops... Sorry, I guess, something went wrong. You can:",
      options: {
        email: `contact with author by this email - ${email}`,
        reset: "Press here to reset the application",
      },
    },
  },
  loader: {
    fail: "Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea",
  },
  images: {
    failed: "something went wrong during image loading :(",
  },
  404: "Hey bro? What are you looking for?",
}

const notifications: Notifications = {
  options: {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    autoHideDuration: 3500,
    onClose: () => {},
  },
  maxSnack: isMobile ? 3 : 4,
}

export { title, email, messages, notifications }
