export type ILanguageConfig = {
  menu: {
    nav_option_one: string;
    nav_option_two: string;
    nav_option_three: string;
  };
  work: {
    title: {
      part1: string;
      part2: string;
      part3: string;
      part4: string;
      part5: string;
      part6: string;
      part7: string;
      part8: string;
    };
    iconsTooltip: {
      instagram: string;
      linkedin: string;
      github: string;
    };
    job: {
      noneDateText: string;
      error: {
        loadingContentTitle: string;
        loadingContentDescription: string;
      };
    };
    shortSummary: string;
    contactButtonLabel: string;
  };
  about: {
    title: {
      part1: string;
      part2: string;
      part3: string;
    };
    textOne: {
      partOne: string;
      partTwo: string;
    };
    textTwo: string;
    textThree: string;
    textFour: string;
    textFive: string;
  };
  contactMe: {
    title: {
      part1: string;
      part2: string;
    };
    form: {
      input: {
        email: {
          placeholder: string;
          errors: {
            required: string;
            invalidFormat: string;
          };
        };
        name: {
          placeholder: string;
          errors: {
            required: string;
          };
        };
        message: {
          placeholder: string;
          errors: {
            required: string;
            minLength: string;
          };
        };
        submitButton: {
          text: string;
          success: string;
          loading: string;
        };
      };
    };
  };
  footer: {
    centeredText: string;
  };
};

export enum LanguagesSupported {
  en = "en",
  pt = "pt",
}

export enum FlagsByLanguage {
  en = "🇺🇸",
  pt = "🇧🇷",
}

export enum LabelByLanguage {
  en = "🇺🇸 English",
  pt = "🇧🇷 Português",
}

// Create a map of languages by label
export const languagesMap = Object.entries(LabelByLanguage).map(
  ([key, label]) => ({
    value: key as LanguagesSupported,
    label,
  })
);
