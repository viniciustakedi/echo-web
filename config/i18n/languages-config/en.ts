import { ILanguageConfig } from ".";

export const enContentConfig: ILanguageConfig = {
  menu: {
    nav_option_one: "Work",
    nav_option_two: "About",
    nav_option_three: "Contact",
  },
  work: {
    title: {
      part1: "Hello there!",
      part2: "I’m ",
      part3: "Vinicius Takedi",
      part4: ",",
      part5: "a ",
      part6: "software engineer",
      part7: "based in ",
      part8: "Brazil",
    },
    iconsTooltip: {
      instagram: "Go to my Instagram",
      linkedin: "Go to my LinkedIn",
      github: "Go to my Github",
    },
    job: {
      noneDateText: "Present",
      error: {
        loadingContentTitle:
          "Error to get job experience...I'm sorry about that!",
        loadingContentDescription: "Please try again later.",
      },
    },
    shortSummary:
      "As a Brazilian software engineer with over four years of experience, I specialize in crafting reliable, scalable solutions for companies building exceptional products.",
    contactButtonLabel: "Contact Me",
  },
  about: {
    title: {
      part1: "Who ",
      part2: "is Vinicius Takedi ",
      part3: "?",
    },
    textOne: {
      partOne:
        "<p><strong>I hold</strong> a bachelor's degree in <strong>computer science</strong>, was hard...</p>",
      partTwo:
        "<p>...however, <strong>friendships</strong> made were worth it!</p>",
    },
    textTwo:
      "<p><strong>I</strong> really <strong>enjoy reading</strong> any kind of <strong>book</strong> and <strong>enjoy</strong> a good/different <strong>dish</strong>.</p>",
    textThree:
      "<p><strong>Without</strong> an <strong>organized</strong> environment I can't work I think a good environment makes a <strong>difference</strong> in <strong>everyone's</strong> life!</p>",
    textFour:
      "<p><strong>Being</strong> in <strong>nature</strong> always makes me <strong>reset</strong> my <strong>mind</strong>.</p>",
    textFive:
      "<p>And to finish this little summary, <strong>I have</strong> a <strong>little dog</strong> who is sometimes too <strong>needy</strong></p>",
  },
  contactMe: {
    title: {
      part1: "Contact ",
      part2: "me!",
    },
    form: {
      input: {
        email: {
          placeholder: "Your best email",
          errors: {
            required: "Email is required.",
            invalidFormat: "Invalid email format.",
          },
        },
        name: {
          placeholder: "Your name",
          errors: {
            required: "Name is required.",
          },
        },
        message: {
          placeholder: "Your message...",
          errors: {
            required: "Message is required.",
            minLength: "Message must be at least 10 characters long.",
          },
        },
        submitButton: {
          text: "Send!",
          success: "Message sent successfully!",
          loading: "Sending...",
        },
      },
    },
  },
  footer: {
    centeredText: "Made with ❤️‍🩹 by Vinicius Takedi",
  },
};
