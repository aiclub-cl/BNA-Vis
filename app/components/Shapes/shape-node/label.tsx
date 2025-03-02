function NodeLabel(props: { placeholder: string }) {
  return (
    <input type='text' className='node-label font-semibold text-white' placeholder={props.placeholder} />
  );
}

export default NodeLabel;
