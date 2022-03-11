import Link from 'next/link';
import { useRouter } from 'next/router';
import IvyImage from '../assets/ivy.jpeg'
import Image from 'next/image';

export default function Layout({ children }) {
  const router = useRouter();

  const menuItems = [
    {
      href: '/',
      title: 'Dashboard',
    }
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <header 
      className='bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase'>
        <p className='text-emerald-600'>Automated Watering Plant Dashboard</p>
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside 
           style={{
            backgroundImage: `url(${IvyImage}})`
          }}
        className='bg-fuchsia-100 w-full md:w-60'>
                <Image
        loader={() => IvyImage}
        src={IvyImage}
        alt="Ivy"
        unoptimized={true}
      />
          <nav>
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className='m-2' key={title}>
                  <Link href={href}>
                    <a
                      className={`flex p-2 bg-emerald-200 rounded hover:bg-emerald-400 cursor-pointer ${
                        router.asPath === href && 'bg-emerald-600 text-white'
                      }`}
                    >
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
