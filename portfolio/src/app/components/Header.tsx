export function Header() {
  return (
    <header className="text-center p-10 bg-gradient-to-r from-blue-500 to-green-600 shadow-lg relative w-full">
      <h1 className="text-5xl font-extrabold">Daniel Flint</h1>
      <p className="text-gray-200 mt-2 text-xl">Full-Stack Engineer</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="https://github.com/blortfish" target="_blank" className="text-white text-4xl hover:text-gray-300">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/daniel-flint-8815544b" target="_blank"
           className="text-white text-4xl hover:text-gray-300">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://s3.amazonaws.com/guild.gun.io/media/resumes/Resume_NJPQCPn.pdf" target="_blank" className="text-white text-4xl hover:text-gray-300">
          <i className="fa-solid fa-file"></i>
        </a>
      </div>
    </header>
  );
}

export default Header;
