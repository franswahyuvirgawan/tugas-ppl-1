import axios from "axios";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import useUserStore from "../store/userStore";

function SemuaDataUSer({ api, metode }: { api: string; metode: string }) {
  const store = useUserStore();
  interface UserData {
    id: string;
    nim: string;
  }

  interface DataItem {
    id: number;
    number: number;
    result: number;
    time: number;
    createdAt: string;
    userId: string;
    user: UserData;
  }

  const [data, setData] = useState<DataItem[] | null>(null);
  const [urutan, setUrutan] = useState<string>("asc");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>(`${api}?sort=${urutan}`, {
        headers: {
          Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [api, urutan]);

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice();
    return `${day}-${month}-${year}`;
  }

  function formatDecimal(input: number): string {
    if (input % 1 === 0) {
      return input.toString();
    } else {
      return input.toFixed(2);
    }
  }

  return (
    <>
      <div className="px-[40px] text-xs flex justify-center flex-col items-center gap-[60px]">
        <h1 className="lg:text-4xl text-2xl font-bold text-center">
          Log perhitungan
        </h1>
        {/* Log data all user */}
        <div className="flex flex-col w-[320px] lg:w-[800px] gap-[32px] items-center relative z-30">
          <div className="flex flex-row gap-2 items-center">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-xs p-5 btn-primary m-1 flex flex-col items-center lg:btn-base"
              >
                Urutan
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-100 rounded-box w-40 flex flex-col gap-1"
              >
                <li>
                  <button
                    onClick={() => setUrutan("")}
                    className="text-xs lg:text-sm"
                  >
                    Default
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setUrutan("asc")}
                    className="text-xs lg:text-sm"
                  >
                    ASC
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setUrutan("desc")}
                    className="text-xs lg:text-sm"
                  >
                    DESC
                  </button>
                </li>
              </ul>
            </div>
            <button
              disabled={loading ? true : false}
              className="btn btn-xs p-5 btn-primary flex flex-col items-center"
              onClick={() => fetchData()}
            >
              {loading ? (
                <div className="w-ful flex flex-row gap-2 items-center">
                  <span className="text-white loading loading-spinner loading-xs"></span>{" "}
                  Reload {metode}
                </div>
              ) : (
                <div className="w-ful flex flex-row gap-2 items-center">
                  Reload {metode}
                </div>
              )}
            </button>
          </div>

          <div className="relative z-0 overflow-x-auto lg:w-[800px] w-full h-[280px] lg:h-[500px] gap-[26px]">
            <table className="table table-pin-rows table-pin-cols table-zebra table-xs lg:table-md text-center">
              <thead>
                <tr>
                  <th>id</th>
                  <th>NIM</th>
                  <th>Input</th>
                  <th>Hasil</th>
                  <th>Waktu (ms)</th>
                  <th>Dibuat</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {loading ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="w-full flex flex-row justify-center py-40">
                        <PuffLoader
                          color="#fff"
                          // loading={loading}
                        />
                      </div>
                    </td>
                  </tr>
                ) : data?.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="w-full flex flex-row justify-center py-40">
                        Silangkan lakukan perhitungan terlebih dahulu.
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {data?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.user.nim}</td>
                        <td>{item.number}</td>
                        <td>{formatDecimal(item.result)}</td>
                        <td>{item.time}</td>
                        <td>{formatDate(item.createdAt)}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SemuaDataUSer;
