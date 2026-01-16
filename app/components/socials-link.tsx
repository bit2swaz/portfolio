import ArrowIcon from "./arrow-icon";

interface SocialProps {
  url: string;
  title: string;
}

export const SocialsLink = (props: SocialProps) => {
  return (
    <li>
      <a
        className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-underline duration-500 ease-in-out hover:underline"
        rel="noopener noreferrer"
        target="_blank"
        href={props.url}
      >
        <ArrowIcon />
        <p className="h-7 ml-2">{props.title}</p>
      </a>
    </li>
  );
};
