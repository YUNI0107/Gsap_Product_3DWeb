import { motion } from 'framer-motion'
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
      {links.map((link, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2 + 0.1 * index,
            type: 'spring',
            stiffness: 100,
          }}
          className="my-5"
          key={link.key}
        >
          <LinkItem
            key={link.key}
            link={link}
            active={false}
            lightMode={lightMode}
          />
        </motion.div>
      ))}
    </>
  )
}

export default NavbarLinks
