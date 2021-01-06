import Nav from "./nav";
import ForceDirectedNav from "../components/ForceDirectedNav";
const Layout = ({ children, categories, seo }) => (
  <>
    {/* <Nav categories={categories} /> */}
    <ForceDirectedNav />
    {children}
  </>
);

export default Layout;
