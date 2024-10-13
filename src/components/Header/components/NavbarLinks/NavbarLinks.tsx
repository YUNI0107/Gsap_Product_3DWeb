import LinkItem from '../LinkItem'

const links = [
  { title: 'LANDING', key: 'landing' },
  { title: 'ABOUT', key: 'about' },
  { title: 'INTRODUCTION', key: 'introduction' },
  { title: 'CONTACT US', key: 'contact' },
]

function NavbarLinks({ lightMode = false }: { lightMode?: boolean }) {
  return (
    <>
      {links.map((link) => (
        <div className="my-5" key={link.key}>
          <LinkItem
            key={link.key}
            link={link}
            active={false}
            lightMode={lightMode}
          />
        </div>
      ))}
    </>
  )
}

export default NavbarLinks
