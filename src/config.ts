import envalid from "envalid";
import { Config } from "./types";

export const envValidators = {
  EVENT_TIME_FORMAT: envalid.str({
    desc: "Time format to use when logging events",
    default: "yyyy-MM-dd hh:mm:ss ZZZ",
  }),
  EVENT_TIME_ZONE: envalid.str({
    desc: "Time zone to use when logging events",
    default: "UTC",
  }),
  EVENT_LABEL_FOR_SINGLE_CLICK: envalid.str({
    desc: "Event label to log when the button is pressed once",
    default: "SINGLE",
  }),
  EVENT_LABEL_FOR_DOUBLE_CLICK: envalid.str({
    desc: "Event label to log when the button is pressed twice",
    default: "DOUBLE",
  }),
  EVENT_LABEL_FOR_LONG_CLICK: envalid.str({
    desc: "Event label to log when the button is long-pressed",
    default: "LONG",
  }),
  EVENT_LINE_FORMAT: envalid.str({
    desc: "Line format to use (must include line ending)",
    default: "%TIME% %LABEL%\n",
  }),

  GIT_REPO_URI: envalid.str({
    desc: "Git repository URI (must include authentication)",
    example: "https://username:token@github.com/example/my-data.git",
  }),
  GIT_REPO_BRANCH: envalid.str({
    desc: "Branch to change",
    default: "master",
  }),

  GIT_FILE_PATH: envalid.str({
    desc: "Path to the log file in the git repo",
    example: "clicks.txt",
  }),

  GIT_COMMIT_USER_NAME: envalid.str({
    default: "IoT Button click handler",
  }),
  GIT_COMMIT_USER_EMAIL: envalid.str({
    default: "https://github.com/kachkaev/aws-iot-button-logger-to-git",
  }),
  GIT_COMMIT_MESSAGE: envalid.str({
    default: "Log IoT button click",
  }),
  GIT_COMMIT_UTC_OFFSET: envalid.num({
    default: 0,
    desc:
      "A UTC offset (minutes or hours) applied to the timestamp in the commit message (0 = UTC)",
  }),
};

export const getConfig = ({ useLocalDotEnv = false } = {}): Config => {
  const config = envalid.cleanEnv(process.env, envValidators, {
    strict: true,
    ...(!useLocalDotEnv && { dotEnvPath: undefined }),
    reporter: ({ errors }) => {
      const errorKeys = Object.keys(errors);
      if (!errorKeys.length) {
        return;
      }
      throw new Error("Invalid env vars: " + errorKeys);
    },
  });

  return config;
};