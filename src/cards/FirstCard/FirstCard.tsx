import { useState, useCallback, ChangeEvent, ReactElement } from "react";
import CloseIcon from "@rsuite/icons/Close";
import CheckIcon from "@rsuite/icons/Check";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

const Icon = ({
  value,
  handleClose,
}: {
  value: string;
  handleClose: () => void;
}) => {
  return (
    <div className="flex justify-center">
      {value.length === 0 ? (
        <div className="w-6" />
      ) : value.length < 10 ? (
        <CloseIcon onClick={handleClose} className="text-white w-6 h-6" />
      ) : value.length === 10 && value[0] > "5" ? (
        <CheckIcon className="text-green-400 h-6 w-6" />
      ) : (
        <p className="text-red-400 text-2xl w-6 text-right">!</p>
      )}
    </div>
  );
};

const SUBMIT_STATES = {
  DEFAULT: "default",
  PROCESS: "processing",
  DONE: "submitted",
};

export const FirstCard = (): ReactElement => {
  const [number, setNumber] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [submit, setSubmit] = useState<string>(SUBMIT_STATES.DEFAULT);

  const handleClose = useCallback(() => {
    setNumber("");
  }, []);
  const pushToPaychek = useCallback(() => {
    window.location.href = "https://paychek.uni.club/";
  }, []);
  const pushToPlaystore = useCallback(() => {
    window.open(
      "https://play.google.com/store/apps/details?id=cards.uni.app.credit",
      "_blank"
    );
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 11) return;
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setNumber(numericValue);
  }, []);
  const handleCheck = useCallback(() => {
    setCheck(!check);
  }, [check]);
  const handleApply = useCallback(async () => {
    if (check === true && number.length === 10 && number[0] > "5") {
      setSubmit(SUBMIT_STATES.PROCESS);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmit(SUBMIT_STATES.DONE);
    }
  }, [check, number]);

  return (
    <div className="h-full w-full">
      <video
        className="absolute object-cover h-full w-full"
        autoPlay
        loop
        muted>
        <source
          src={require("../../resources/nxt_wave_bg.mp4")}
          type="video/mp4"
        />
      </video>
      <div className="flex flex-col h-screen w-full justify-start absolute">
        <div className="flex justify-around items-start w-full h-64">
          <p className="font-bold text-4xl mt-4 -ml-52">UNI</p>
          <button
            className="flex justify-center items-center mt-10 -mr-28"
            onClick={pushToPaychek}>
            <div className="w-32 h-10 rounded-lg bg-black absolute opacity-60" />
            <p className="absolute text-white text-sm font-semibold z-2">
              Uni Paychek
            </p>
          </button>
        </div>
        <div className="flex justify-end w-full -mt-5 -ml-20">
          <div className="mx-5 absolute justify-center">
            <p className="text-5xl w-2/5 text-left my-5">
              <strong>NX Wave.</strong> The next-gen credit card for those who
              love rewards.
            </p>
            <p className="font-semibold text-sm">
              1% Cashback + 5x Rewards + Zero Forex Markup
            </p>
            {submit !== SUBMIT_STATES.DONE ? (
              <>
                <div className="w-72 h-12 mt-8 flex justify-between items-center bg-black rounded-lg">
                  <input
                    className="w-36 bg-black border-0 text-sm mx-2 outline-0 text-white"
                    placeholder="Enter Phone Number"
                    value={number}
                    onChange={handleInputChange}
                  />
                  <Icon value={number} handleClose={handleClose} />
                  <button
                    className={`bg-yellow-200 w-64 mx-1 h-10 text-sm rounded-lg ${
                      number.length > 0 ? "bg-yellow-400" : ""
                    }`}
                    onClick={handleApply}>
                    {submit === SUBMIT_STATES.DEFAULT ? (
                      <p>Apply Now</p>
                    ) : (
                      <div className="flex items-center justify-center">
                        <SpinnerIcon
                          className="w-6 h-6 mx-1 text-black"
                          pulse
                        />
                        <p>Applying</p>
                      </div>
                    )}
                  </button>
                </div>
                <div
                  className="flex w-72 mt-4 justify-center items-center"
                  onClick={handleCheck}>
                  <input type="checkbox" className="mr-1" checked={check} />
                  <p className="h-6 w-64" style={{ fontSize: "9px" }}>
                    You agree to be contacted by Uni Cards over Call, SMS, Email
                    or WhatsApp to guide you through your application.
                  </p>
                </div>
              </>
            ) : (
              <>
                <button
                  className="bg-yellow-200 w-72 mx-1 h-12 mt-8 text-sm rounded-lg font-medium"
                  onClick={pushToPlaystore}>
                  Download
                </button>
                <p className="h-6 w-72 mt-2 ml-1" style={{ fontSize: "9px" }}>
                  Thank you for your interest in the Uni Card. <br /> Download
                  the Uni Cards app now and get your Uni Card in minutes.
                </p>
              </>
            )}
          </div>
          <img
            className="w-96 h-96 mr-80"
            alt=""
            src={require("../../resources/nx_wave_hero.png")}
          />
        </div>
      </div>
    </div>
  );
};
