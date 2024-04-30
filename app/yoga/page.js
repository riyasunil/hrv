import Navbar from "@/components/navbar/navbar";
import Yogacard from "@/components/yogacard/yogacard";

export default function YogaPage() {
    return (
        <div>
            <Navbar />
        <div className="bg-white text-black grid place-items-center grid-cols-3 h-full gap-10 pt-10 pb-10">
            <Yogacard 
             name={"Stick Pose (Yastikasana)"}
             imageUrl={"https://www.realsimple.com/thmb/b736KtIWk9WGyJvKpQ6iAcXB2yU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RS_YogaExercises_Stress_1-676524353ac7499fa6225a47ecb08810.jpg"}
             description={"Lie face up on the floor with your legs extended and feet together. Extend your arms above your head so they’re resting on the ground, arms parallel with each other. From this position, inhale and stretch your body as long as you can, extending through your fingers and toes as if you’re trying to reach something at each end of you. Hold for five to 10 seconds, breathing deeply. Release and repeat two to three times."}
            />
             <Yogacard 
             name={"Corpse Pose (Savasana)"}
             imageUrl={"https://www.realsimple.com/thmb/S-KQF4DEiOJLQEZiSgRHR4ZsE8A=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RS_YogaExercises_Stress_2-f8516eccf07546aa84b777ac022f5291.jpg"}
             description={"Lie away from your torso with palms turned up. Relax your entire body from head to toes. Keep your spine neutral; if necessary, place a pillow under your knees to reduce lower back strain. Now relax. Stay here for five to 20 minutes."}
            />
             <Yogacard 
             name={"Reclining Bound Angle With Bolster (Supta Baddha Konasana)"}
             imageUrl={"https://www.realsimple.com/thmb/WqqPc6MDZ_xKboxT-_dQJzYLVmU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RS_YogaExercises_Stress_3-75e5c965b58b4af497a889abcd8a8ff4.jpg"}
            description={"Place a bolster (you can also use several folded-up blankets, or a rolled up towel) lengthwise on your mat and lie back on the bolster/blankets so they support your spine, neck, and head. Your tailbone and hips should be off the bolster and resting on the floor. Bring the soles of your feet together and let your knees fall open wide. (Place blocks, pillows, or rolled-up towels under each thigh or knees for added support.) Extend your arms to your sides, below shoulder height, palms facing up. Close your eyes and stay here for up to five minutes."}
/>
              <Yogacard 
             name={"Legs Up the Wall Pose (Viparita Karani)"}
             imageUrl={"https://www.realsimple.com/thmb/M_9M747OoRevzKAQYQswoeQpeyg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RS_YogaExercises_Stress_4-038e61ee0b86420c82defb679cde2bef.jpg"}
             description={"Sit with one side of your body against a wall. From this position, lie onto your back and move your legs so they’re extended up against the wall, feet either together or hip-width apart, and your ankles relaxed. If you have any lower body stiffness, you can move your hips a couple of inches away from the wall. Relax your arms at your sides, palms turned up, and hold for one to five minutes. If, though, you feel tingling or numbness in your feet, come out of the pose sooner, moving slowly."}
            />
              <Yogacard 
             name={"Rag Doll Pose (Uttanasana Variation)"}
             imageUrl={"https://www.realsimple.com/thmb/UVIyhn7aVPzPElvNMFIfmJ1ZvzI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RS_YogaExercises_Stress_5-49dfb0e1843a4572aafa23274f6c3add.jpg"}
description={"Stand with your feet hip-width apart. Bend your knees and fold forward from your hips. Let the crown of your head hang toward the ground and be heavy. Bend your elbows and grasp each elbow with the opposite hand. Hold here for 10 seconds to a minute, going deeper into the pose with each exhalation."}
             />

             <Yogacard 
             name={"One-Legged Seated Forward Bend (Janu Shirasasana)"}
             imageUrl={"https://www.realsimple.com/thmb/kmdCpc9dyoTRQA8m6ae_ZAgED_g=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RS_YogaExercises_Stress_6-78793d70bc5e411fb443ab54f413277d.jpg"}
             description={"Sit on the floor with your legs extended in front of you. Bend your right knee and place your right foot against your left thigh. Sitting tall, extend both arms over your head as you stretch up. Exhale and bend forward from your hips over the left leg, keeping your neck elongated and shoulders relaxed. Rest your hands comfortably wherever you can reach on your left shin (no need to prove anything—listen to your body and stop where you’re comfortable). As you inhale, extend your spine longer, and as you exhale, fold over your leg more. Hold for 10 to 60 seconds. Release and repeat with the opposite leg extended. "}
             />
              
             
            
        </div>
        </div>
    )
}