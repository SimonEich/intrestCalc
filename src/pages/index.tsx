import Head from "next/head";
import Link from "next/link";
import { Input } from "postcss";
import { useState } from "react";

import { api } from "~/utils/api";

const interestYear = []



export default function Home() {

  const [year,setYear] = useState("")
  const [interest,setInterest] = useState("");
  const [capital, setCapital] = useState("")
  const [result, setResult] = useState("")

function showYears(){
  setYear(year)
  setInterest(interest)
  setCapital(capital)
  const res = String(Number(capital) * (1 + Number(interest)/100)**Number(year))

  setResult(res)
  console.log(year)
  console.log(interest)
  console.log(String(res))
}


  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">

        <h1>Interest Calculator</h1>

       <div className="flex bg-slate-300 rounded-lg p-8">
        <div className="">
          <div className="w-80">
          <label htmlFor="Kapital" className="">Kapital:</label>
          <input type="number" placeholder="Kapital" className="bg-slate-100 m-8" value={capital}
                onChange={e => setCapital(e.target.value)} 
                onKeyDown={(e) => {
          if (e.key === "Enter") {
            showYears()
            }
          }
        }/>
          </div>
          <div>
          <label htmlFor="" className="">Years:</label>
          <input type="number" placeholder="Years" className="bg-slate-100 m-8" value={year}
                onChange={e => setYear(e.target.value)} 
                onKeyDown={(e) => {
          if (e.key === "Enter") {
            showYears()
            }
          }
        }/>
          </div>
          <div>
          <label htmlFor="" className="">Interest in Percent:</label>
          <input type="number" placeholder="Interest" className="bg-slate-100 m-8" value={interest}
                onChange={e => setInterest(e.target.value)} 
                onKeyDown={(e) => {
          if (e.key === "Enter") {
            showYears()
            }
          }
        }/>
          </div>
          <div className="flex flex-col items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={showYears}>Calculate</button>
          </div>
          <div className="flex flex-col items-center justify-center mt-6">
          <h1>{result}</h1>
          </div>
        </div>
        

       </div>
      </main>
    </>
  );
}
