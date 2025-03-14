function NodeLabel(props: { placeholder: string }) {
  return (
    <input type='text' className='node-label font-semibold text-white max-w-12 truncate' placeholder={props.placeholder} />
  );
}

export default NodeLabel;
