'use client'
interface IprojectDirectoryLayoutProps {
    children: React.ReactNode;
}
const ChallengesLayout: React.FunctionComponent<IprojectDirectoryLayoutProps> = ({children}) => {
  return (
    <section>
        {children}
    </section>
  );
};

export default ChallengesLayout;