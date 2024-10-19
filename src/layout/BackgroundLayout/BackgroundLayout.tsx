function BackgroundLayout() {
  return (
    <>
      <section
        id="landing"
        className="mt-[-100vh] h-[300vh] bg-bgPrimary transition-colors duration-500"
      />

      <section
        id="about"
        className="relative -mt-1 h-[300vh] overflow-hidden bg-bgPrimary"
      >
        {/* circle */}
        <div className="w-full origin-top translate-y-[0%] scale-150 pb-[100%]">
          {/* <div className="absolute top-0 w-full translate-y-[50%] scale-150 pb-[100%]"> */}
          <div className="absolute top-0 h-full w-full rounded-full bg-black"></div>
        </div>

        {/* rectangle */}
        <div className="absolute top-0 h-full w-full translate-y-[50vw] bg-black" />
      </section>
    </>
  )
}

export default BackgroundLayout
