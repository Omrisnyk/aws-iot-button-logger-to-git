import { handler } from "./handler";
import { Context } from "aws-lambda";
import { envValidators } from "./config";
import envalid from "envalid";
import { IotButtonClickType } from "./types";

const simulate = async () => {
  const useLocalDotEnv = process.env.NODE_ENV !== "test";

  const { CLICK_TYPE } = envalid.cleanEnv(
    process.env,
    {
      ...envValidators,
      CLICK_TYPE: envalid.str({
        desc: "Simulated click type",
        choices: ["SINGLE", "DOUBLE", "LONG"],
        default: "SINGLE",
      }),
    },
    {
      ...(!useLocalDotEnv && { dotEnvPath: null }),
    },
  );

  await handler(
    {
      serialNumber: "xxx",
      batteryVoltage: "xxmV",
      clickType: CLICK_TYPE as IotButtonClickType,
      useLocalDotEnv,
    },
    ({} as any) as Context,
    null,
  );
};

/* istanbul ignore if */
if ((process.mainModule || ({} as any)).filename === __filename) {
  simulate();
}

export default simulate;
