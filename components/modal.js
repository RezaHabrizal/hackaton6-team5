import {useState} from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Modal({openModal, setOpenModal, postNotes, setData}) {
  const [startDate, setStartDate] = useState(new Date());
  const [epoch, setEpoch] = useState("")
  const [note, setNote] = useState("")

  return (
    <div id="defaultModal" aria-hidden="true" className={`${!openModal ? "hidden" : ""} relative overflow-y-auto overflow-x-hidden z-50 justify-center items-center h-modal md:h-full md:inset-0`}>
    <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                    Add Notes
                </h3>
                <button type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
                onClick={() => setOpenModal(!openModal)}
                >
                    <svg
                    className="w-5 h-5"
                    fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd">
                      </path>
                    </svg>  
                </button>
            </div>
            <div className="p-6 space-y-6">
              <DatePicker selected={startDate} onChange={(date) => {
                setStartDate(date)
                const selected = date
                let stringDate = selected.getFullYear()+'-'+(selected.getMonth()+1)+'-'+selected.getDate();
                let time = selected.getHours() + ":" + selected.getMinutes() + ":" + selected.getSeconds();
                let dateTime = stringDate+' '+time;
                const timestamp = Date.parse(dateTime)
                setEpoch(timestamp)
                }} />
              <div className="relative z-0 mb-6 w-full group">
			          <input onChange={(e) => setNote(e.target.value)} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
			          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Notes</label>
		        </div>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button onClick={() => {
                  postNotes({date: epoch, note: note})
                  // setData((state) => 
                  //   [...state, {date: epoch, note: note}]
                  // )
                  setOpenModal(false)
                }} data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </div>
        </div>
    </div>
</div>

  )
}