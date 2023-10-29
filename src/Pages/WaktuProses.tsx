import axios from "axios";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import useUserStore from "../store/userStore";

function WaktuProses({ apiProses }: { apiProses: string }) {
  const store = useUserStore();

  interface DataProses {
    fastestProcessingTime: number;
    slowestProcessingTime: number;
    averageProcessingTime: number;
  }

  const [dataProses, setDataProses] = useState<DataProses | null>(null);
  const [loadingProses, setLoadingProses] = useState<boolean>(false);

  const fetchDataProses = async () => {
    setLoadingProses(true);
    try {
      const response = await axios.get<DataProses>(apiProses, {
        headers: {
          Authorization: `Bearer ${store.userToken}`,
        },
      });
      setDataProses(response.data);
      setLoadingProses(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataProses();
  }, [apiProses]);

  return (
    <>
      <div className="px-[40px] text-xs flex justify-center flex-col items-center gap-[60px]">
        {/* Log data proses */}
        <h1 className="lg:text-4xl text-2xl font-bold text-center">
          Log data proses user
        </h1>
        <div className="flex flex-col w-[320px] lg:w-[800px] gap-[32px] items-center relative z-30">
          <div className="flex flex-row gap-2 items-center">
            <button
              disabled={loadingProses ? true : false}
              className="btn btn-xs p-5 btn-primary flex flex-col items-center"
              onClick={() => fetchDataProses()}
            >
              {loadingProses ? (
                <div className="w-ful flex flex-row gap-2 items-center">
                  <span className="text-white loading loading-spinner loading-xs"></span>{" "}
                  Reload
                </div>
              ) : (
                <div className="w-ful flex flex-row gap-2 items-center">
                  Reload
                </div>
              )}
            </button>
          </div>

          <div className="relative z-0 overflow-x-auto lg:w-[800px] w-full h-[280px] lg:h-[500px] gap-[26px]">
            <table className="table table-pin-rows table-pin-cols table-zebra table-xs lg:table-md text-center">
              <tbody className="w-full">
                {loadingProses ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="w-full flex flex-row justify-center py-20">
                        <PuffLoader
                          color="#fff"
                          // loading={loading}
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <th>Waktu Pemrosesan Tercepat</th>
                      <td>{dataProses?.fastestProcessingTime}</td>
                    </tr>
                    <tr>
                      <th>Waktu Pemrosesan Terlama</th>
                      <td>{dataProses?.slowestProcessingTime}</td>
                    </tr>
                    <tr>
                      <th>Rata-rata Waktu Pemrosesan</th>
                      <td>{dataProses?.averageProcessingTime}</td>
                    </tr>
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

export default WaktuProses;
