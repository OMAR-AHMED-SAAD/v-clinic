import ConditionalRender from "../../reusable/ConditionalRender/ConditionalRender"
const PackageInfo = ({ healthPackage, renewalDate=null }) => {
    return (
        <div key={healthPackage._id}>
            <p>Packages renew automatically using wallet</p> 
            <p>
                <strong>Package Name: </strong>
                {healthPackage?.name}
            </p>
            <p>
                <strong>Package Price: </strong>
                {healthPackage?.price} EGP
            </p>
            <p>
                <strong>Session Discount: </strong>
                {healthPackage?.sessionDiscount} %
            </p>
            <p>
                <strong>Medicine Discount: </strong>
                {healthPackage?.medicineDiscount} %
            </p>
            <p>
                <strong>Family Package Subscribtion Discount: </strong>
                {healthPackage?.familySubsDiscount} %
            </p>
            <ConditionalRender condition={renewalDate!=null}>
            <p>
                <strong>Auto Renewal: </strong>
                {new Date(renewalDate).toDateString()}
            </p>
            </ConditionalRender>
        </div>
    )
}
export default PackageInfo
