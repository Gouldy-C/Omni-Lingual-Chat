import LoadingSpinner from '@/components/LoadingSpinner'


function loading() {
  return (
    <div
      className='flex justify-center items-center p-10 mt-36'>
        <LoadingSpinner size={58}/>
    </div>
  )
}

export default loading