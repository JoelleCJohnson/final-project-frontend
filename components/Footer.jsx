export default function Footer() {
    return(
        <footer className="bottom-0 left-0 z-20 w-full p-4 bg-red-600 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
  <span className="text-sm text-gray-100 sm:text-center">
    © 2023{" "}
    <a href="www.linkedin.com/in/joelle-c-johnson" className="hover:underline">
      Joelle C Johnson™
    </a>
    . All Rights Reserved.
  </span>
  <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-zinc-50 sm:mt-0">
    <li>
      <a href="#" className="hover:underline me-4 md:me-6">
        About
      </a>
    </li>
    <li>
      <a href="#" className="hover:underline me-4 md:me-6">
        Privacy Policy
      </a>
    </li>
    <li>
      <a href="#" className="hover:underline me-4 md:me-6">
        Licensing
      </a>
    </li>
    <li>
      <a href="#" className="hover:underline">
        Contact
      </a>
    </li>
  </ul>
</footer>

    )
}