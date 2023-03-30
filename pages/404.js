import Link from 'next/link'
import Image from 'next/image'
import bpEmblem from '../public/image/bp-emblem.svg'

export default function FourOhFour() {
  return (
    <div className="container">
      <div className="row">
        <div className="page-not-found">
          <h1>404</h1>

          <p>Sajnos az oldal nem található, de ne csüggedj!</p>

          <div className="back-wrapper">
            <Link href="/" className="btn btn-primary">
              Vissza a főoldalra
            </Link>
          </div>

          <div className="eblem">
            <Image
              src={bpEmblem}
              alt="Budapest logó"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
