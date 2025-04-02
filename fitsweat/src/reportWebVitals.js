const reportWebVitals = onPerfEntry => { // 웹 애플리케이션의 성능 지표를 측정하고 보고
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); //레이아웃 안정
      getFID(onPerfEntry); //반응성 및 상호작용
      getFCP(onPerfEntry); //첫 번째 콘텐츠의 작동까지 걸리는 시간
      getLCP(onPerfEntry); //주요 페이지 콘텐츠의 로드되는 시간
      getTTFB(onPerfEntry); // 서버가 응답하는 시간 
    });
  }
};

export default reportWebVitals;

