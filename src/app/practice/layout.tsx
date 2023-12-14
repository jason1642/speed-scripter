
import NoLoginHeader from "@/components/headers/NoLoginHeader";

interface IprojectDirectoryLayoutProps {
    children: React.ReactNode;
}
const ChallengesLayout: React.FunctionComponent<IprojectDirectoryLayoutProps> = ({children}) => {
  return (
    <section>
        <NoLoginHeader />

        {children}
    </section>
  );
};

export default ChallengesLayout;