import MeetingDetailPageContainer from '@/ui/MeetingDetail';

const MeetingDetail = ({ params }: { params: { id: string } }) => {
  return <MeetingDetailPageContainer meetingId={params.id} />;
};

export default MeetingDetail;
