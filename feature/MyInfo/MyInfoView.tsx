"use client";


type Props = {
  mode?: "view" | "edit";
  onEdit?: () => void;
  onCancel?: () => void;
};

export default function MyInfoView({
  mode = "view",
  onEdit,
  onCancel,
}: Props) {
//   const { data, loading, error } = useMyInfo();

//   if (loading) return <div>로딩중...</div>;
//   if (error || !data) return <div>에러</div>;

  return ( 
    <div> card 들어갈곳</div>
    // <MyInfoCard
    //   myInfo={data}
    //   mode={mode}
    //   onEdit={onEdit}
    //   onCancel={onCancel}
    // />
  );
}
