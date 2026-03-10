import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "spark_welcome_shown";

const WelcomeDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog card */}
      <div className="relative bg-dark-2 border border-dark-4 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">✨</span>
          <h2 className="h3-bold text-light-1">Hey there!</h2>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 text-light-2">
          <p className="base-regular">
            Just wiping off the dust here — welcome to{" "}
            <span className="text-primary-500 base-semibold">Spark</span>!
          </p>
          <p className="base-regular">
            Quick heads-up: <span className="text-light-1 base-medium">images no longer show up</span>.
            The database plan I'm on stopped allowing image retrieval without a paid subscription,
            so for now you'll see blank image spots. 😔
          </p>
          <p className="base-regular">
            Everything else still works, so feel free to explore, browse posts, and look around!
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-dark-4 w-full" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <p className="small-regular text-light-4">
            This message won't show again.
          </p>
          <Button
            className="shad-button_primary rounded-xl px-6"
            onClick={handleClose}
          >
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDialog;
