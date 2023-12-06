export default function ItemCards({itemname, itemlink, itemprice, listid, ispurchased}){
    return(
        <>
           {/* {const thisItem = item */}
                        {/* if (item.ispurchased === false) {
                            return ( */}
                                <li key={listid} className="group w-full px-4 py-2 border-b border-gray-200 rounded-t-lg" 
                                // onClick={() => showItemCard(thisItem)}
                                >      
                                        <h3 className="text-center" >{itemname} </h3>

                                    {/* {show && */}
                                        <div className="block">
                                            <p className="text-center"> Price:   ${itemprice}</p>
                                            <a href={`${itemlink}`} className="flex justify-center text-blue-500">Purchase</a>
                                            <p>
                                                Already purchased?<button className="flex justify-center text-blue-600" onClick={() => handlePurchase(item)}>click here!</button>
                                            </p>
                                        <button className=" px-1.5 text-xs text-red-500 border border-red-300 rounded-full hover:bg-red-500 hover:text-white" onClick={() => deleteButton(item)}>x</button>
                                        </div>
                                    {/* } */}
                                </li>
                            {/* )
                        }
                        else {
                            return (
                                <li key={item.listid} className="group w-full px-4 py-2 border-b border-gray-200 bg-gray-400 text-zinc-200" onClick={() => showItemCard(thisItem)}>
                                    <h3 className="text-center" >{item.itemname}</h3>
                                    {show &&
                                        <button className="px-1.5 text-xs text-red-500 border border-red-300 rounded-full hover:bg-red-500 hover:text-white" onClick={() => deleteButton(item)}>x</button>
                                    }
                                </li>
                            )
                        }} */}
        </>
    )
}