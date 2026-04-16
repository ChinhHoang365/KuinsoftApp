import { useCurrentApp } from "components/context/app.context";

interface IProps {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
}
const AppHeader = (props: IProps) => {
    const {userInfo}= useCurrentApp();
           console.log("app header user info", JSON.stringify(userInfo))
      return (
        <div>
            hello
            App Header
     
        </div>
    );
};
export default AppHeader;