import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Template({ api, metode }: { api: string; metode: string }) {
  interface DataItem {
    id: number;
    number: number;
    result: number;
    time: number;
    createdAt: string;
  }

  const [data, setData] = useState<DataItem[] | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [responseErrors, setResponseErrors] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<DataItem | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<DataItem[]>(api);

      const sortedData = response.data.sort((a, b) => b.id - a.id);

      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [api]);

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  }

  function formatDecimal(input: number): string {
    if (input % 1 === 0) {
      return input.toString();
    } else {
      return input.toFixed(2);
    }
  }

  function formatTime(decimalValue: number): string {
    const totalSeconds = decimalValue * 3600; // Convert to seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Format into HH:MM:SS
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(api, {
        number: inputValue,
      });
      setResponseMessage(response.data);
      setResponseErrors(null);
      fetchData();
    } catch (error: any) {
      setResponseErrors(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center gap-[100px]">
        <div className="flex flex-col gap-6 items-center">
          <h1 className="lg:text-4xl text-2xl font-bold mt-[80px]">
            Program hitung akar kuadrat bilangan
          </h1>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-xs p-5 btn-primary m-1 flex flex-col items-center lg:btn-base"
            >
              Metode
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li>
                <Link className="text-xs lg:text-sm" to="/">
                  API
                </Link>
              </li>
              <li>
                <Link className="text-xs lg:text-sm" to="/plsql">
                  PL/SQL
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[16px] w-full">
            <input
              type="text"
              placeholder="Type here"
              className="input input-sm h-11 input-bordered lg:w-full"
              value={inputValue}
              onChange={handleInputChange}
            />

            <button
              className="btn btn-xs p-5 btn-primary flex flex-col items-center"
              onClick={handleSubmit}
            >
              Submit with {metode}
            </button>
          </div>
          {responseErrors ? (
            <p className="text-red-500 text-xs lg:text-sm">{responseErrors}</p>
          ) : null}
        </div>

        <div className="overflow-x-auto lg:w-[800px] w-full">
          <table className="table table-pin-rows table-pin-cols table-zebra table-xs lg:table-md text-center">
            <thead>
              <tr>
                <th>Angka</th>
                <th>Hasil</th>
                <th>Waktu</th>
                <th>Dibuat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{responseMessage ? responseMessage.number : "0"}</td>
                <td>
                  {responseMessage
                    ? formatDecimal(responseMessage.result)
                    : "0"}
                </td>
                <td>
                  {responseMessage
                    ? formatTime(responseMessage.time)
                    : "00:00:00"}
                </td>
                <td>
                  {responseMessage
                    ? formatDate(responseMessage.createdAt)
                    : "dd-mm-yy"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto lg:w-[800px] w-full h-[280px] gap-[26px]">
          <table className="table table-pin-rows table-pin-cols table-zebra table-xs lg:table-md">
            <thead>
              <tr>
                <th>No</th>
                <th>Angka</th>
                <th>Hasil</th>
                <th>Waktu</th>
                <th>Dibuat</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.number}</td>
                  <td>{formatDecimal(item.result)}</td>
                  <td>{formatTime(item.time)}</td>
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Template;
