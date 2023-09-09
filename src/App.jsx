import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";

const IsometricCamera = () => {
	const camera = useThree((state) => state.camera);
	const { width, height } = useThree((state) => state.viewport);

	useEffect(() => {
		const aspect = width / height;
		const d = 20;
		camera.left = - d * aspect;
		camera.right = d * aspect;
		camera.top = d;
		camera.bottom = - d;
		camera.near = 0.001;
		camera.far = 1000;
		camera.position.set( 20, 20, 20 );
		camera.zoom = 20;
		camera.rotation.order = 'YXZ';
		camera.rotation.y = - Math.PI / 4;
		camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );
		camera.lookAt( 0, 0, 0 );
	}, []);
};

const Scene = () => {
  const boxRef = useRef();

  useFrame((state, delta) => {
    // boxRef.current.rotation.y += 0.005;
  });

  return (
    <>
      <Box ref={boxRef} args={[10, 10, 10]} rotation={[0, 0, 0]}>
        <meshNormalMaterial />
      </Box>
      <ambientLight />
    </>
  );
};

const App = () => {
  return (
    <Canvas orthographic camera={{ zoom: 30 }}>
      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} />
			<IsometricCamera />
      <Scene />
    </Canvas>
  );
};

export default App;
