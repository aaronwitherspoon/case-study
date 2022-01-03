import Link from "next/link";

export default function Custom404() {
   return (
      <div className="my-10">
         <h1 className="text-3xl flex items-center justify-center">404 - Page Not Found</h1>
         <div className='flex text-center justify-center my-10'>
            <Link href={'/'}><a>Home</a></Link>
         </div>
      </div>
   )
 }