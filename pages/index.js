import {useState, useEffect, useCallback} from 'react'
import Modal from "../components/modal";
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("../components/chart"),
  { ssr: false }
);

export default function Homepage() {
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([
    {date: "07/03/2022 14:00", note: "disiram 2 kali"},
    {date: "08/03/2022 17:00", note: "disiram 2 kali"},
  
  ])

  useEffect(() => {
    (async () => {
      await fetch("api/hello", {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => setData(json.data))
      .catch(err => console.log(err))
    })()
  },[])

  const postNotes = useCallback(async (body) => {

      await fetch("api/hello", {
        method: 'POST',
        body: JSON.stringify(body)
      })
      .then((res) => res.json())
      .then((json) => console.log(json))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <Chart />
    <Modal openModal={openModal} setOpenModal={setOpenModal} postNotes={postNotes} setData={setData} />
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Notes
                            </th>
                            <th scope="col" className="relative py-3 px-6">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              <button
                              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              type="button"
                              data-modal-toggle="defaultModal"
                              onClick={() => setOpenModal(!openModal)}
                              >
                                Add Notes
                              </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {data?.map((el, i) => {
                        return (
                          <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {el.date}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {el.height}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {el.note}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  );
}
