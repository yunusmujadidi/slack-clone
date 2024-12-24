const WorkspacePage = async ({
  params,
}: {
  params: Promise<{
    workspaceId: string;
  }>;
}) => {
  const { workspaceId } = await params;
  return (
    <div>
      <p>{workspaceId}</p>
    </div>
  );
};

export default WorkspacePage;
