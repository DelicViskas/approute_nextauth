import SkeletonGrid from "@/components/skeleton/grid";


export default function Loading() {

  return <div className="grid">
    <SkeletonGrid num={20}/>
    </div>
}