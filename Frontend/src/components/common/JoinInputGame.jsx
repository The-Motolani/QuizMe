import { useState } from "react";

export default function JoinGameInput() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // digits only

    if (value.length > 6) return;

    // auto-format 123-456
    if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }

    setCode(value);
    setError("");
  };

  const handleSubmit = () => {
    if (code.replace("-", "").length !== 6) {
      setError("Game code must be 6 digits");
      return;
    }

    console.log("Joining game with code:", code);
  };

  return (
    <div className="w-full flex flex-col items-center mb-5">
      <div
        className="
          bg-pink-200
          flex flex-col md:flex-row
          items-start md:items-center
          gap-3
          rounded-3xl
          border-2 border-pink-300
          px-4 py-6
          mb-2
          transition-all
        "
      >
        <p className="
          font-[Baloo]
          font-bold
          text-xl sm:text-xl md:text-2xl lg:text-3xl
          leading-tight
        ">
          Join Game! Enter a code:
        </p>

        <input
          type="text"
          inputMode="numeric"
          placeholder="123-456"
          value={code}
          onChange={handleChange}
          onFocus={() => setError("")}
          className="
            w-full md:w-80 lg:w-100
            p-3
            rounded-xl
            outline-none
            font-[Baloo]
            font-bold
            text-xl sm:text-xl md:text-2xl lg:text-3xl
            text-center

            bg-pink-200
            border-2 border-pink-200
            focus:border-pink-300
            focus:ring-2 focus:ring-pink-100
            transition-all duration-200
          "
        />
        <button
        onClick={handleSubmit}
        className="
          mt-4
          bg-teal-500
          hover:bg-teal-600
          text-white
          font-bold
          px-8 py-3
          rounded-full
          shadow-md
          transition-all
          items-end
        "
      >
        Join Game
      </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm font-semibold ml-4">
          {error}
        </p>
      )}

      
    </div>
  );
}

 {/* <div className="
  bg-pink-100
  flex flex-col md:flex-row
  items-start md:items-center
  gap-4
  rounded-3xl
  border-2
  px-4 py-6
  mb-5
  w-full
">
  <p className="
    font-[Baloo]
    font-bold
    text-2xl sm:text-3xl md:text-5xl lg:text-5xl
    leading-tight
  ">
    Join Game! Enter a code:
  </p>

  <input
    type="number"
    placeholder="012-456"
    className="
      [appearance:textfield]
      [&::-webkit-outer-spin-button]:appearance-none
      [&::-webkit-inner-spin-button]:appearance-none

      w-full md:w-80 lg:w-96
      p-3
      rounded-xl
      outline-none
      font-[Baloo]
      font-bold
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl
      text-center
    "
  />
</div> */}