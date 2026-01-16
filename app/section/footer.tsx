import { SocialsLink } from "../components/socials-link";

export const Footer = () => {
  return (
    <aside>
      <ul className="flex flex-row flex-wrap md:flex-row mt-6 sm:mt-8 gap-3 sm:gap-4 font-sm text-neutral-600 dark:text-neutral-300">
        <SocialsLink url="https://www.linkedin.com/in/bit2swaz" title="LinkedIn" />
        <SocialsLink url="mailto:bit2swaz@gmail.com" title="Email" />
        <SocialsLink url="https://github.com/bit2swaz" title="GitHub" />
        <SocialsLink url="https://x.com/bit2swaz" title="X" />
      </ul>
    </aside>
  );
};
