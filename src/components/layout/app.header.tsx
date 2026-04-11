interface IProps {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
}
const AppHeader = (props: IProps) => {
    return (
        <div>
            hello
            App Header
        </div>
    );
};
export default AppHeader;