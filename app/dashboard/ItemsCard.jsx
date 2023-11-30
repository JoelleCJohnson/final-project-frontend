export default function ItemsCard({ item }) {
    return (
        <>
            <h3 className="text-center" >{item.itemname}</h3>
            <div className="block">
                <p className="text-center">{item.itemprice}</p>
                <a href={`${item.itemlink}`} className="flex justify-center text-blue-500">Purchase Here</a>
            </div>

        </>
    )
}