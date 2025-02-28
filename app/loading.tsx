import Skeleton from "@/components/skeleton/SkeletonGoods";

export default function Loading() {

  return <div className="grid">
    <Skeleton num={20}/>
    </div>
}