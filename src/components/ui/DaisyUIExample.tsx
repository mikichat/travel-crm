import React from 'react';

const DaisyUIExample = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-primary">DaisyUI 컴포넌트 예시</h1>
      
      {/* 버튼 예시 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">버튼</h2>
        <div className="flex gap-2 flex-wrap">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-info">Info</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-error">Error</button>
        </div>
      </div>

      {/* 카드 예시 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">카드</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">카드 제목</h2>
              <p>카드 내용입니다.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">버튼</button>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">또 다른 카드</h2>
              <p>다른 카드 내용입니다.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">버튼</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 알림 예시 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">알림</h2>
        <div className="space-y-2">
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>정보 알림입니다.</span>
          </div>
          
          <div className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>성공 알림입니다.</span>
          </div>
          
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>경고 알림입니다.</span>
          </div>
          
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>오류 알림입니다.</span>
          </div>
        </div>
      </div>

      {/* 배지 예시 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">배지</h2>
        <div className="flex gap-2 flex-wrap">
          <div className="badge badge-primary">Primary</div>
          <div className="badge badge-secondary">Secondary</div>
          <div className="badge badge-accent">Accent</div>
          <div className="badge badge-info">Info</div>
          <div className="badge badge-success">Success</div>
          <div className="badge badge-warning">Warning</div>
          <div className="badge badge-error">Error</div>
        </div>
      </div>

      {/* 모달 예시 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">모달</h2>
        <button className="btn btn-primary" onClick={() => (window as any).my_modal_1.showModal()}>
          모달 열기
        </button>
        
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">모달 제목</h3>
            <p className="py-4">모달 내용입니다.</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">닫기</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default DaisyUIExample; 