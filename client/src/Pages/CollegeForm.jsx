import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import 'tailwindcss/tailwind.css';

const CollegeForm = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contact_details: [{ type: 'phone', number: [''] }],
      fee_structure: [{ type: 'tuition fee', amount: '' }],
      curriculum: [{ type: '', branch: '' }],
      seats_available: [
        {
          branch: '',
          total_seats: '',
          category_wise_seats: [{ category: '', seats: '' }],
        },
      ],
      past_year_cutoff: [
        {
          year: '',
          overall_cutoff: [{ category: '', cutoff: '' }],
          branch_wise_cutoff: [{ branch: '', cutoff: '' }],
        },
      ],
      hostel_facilities: [{ type: '', availability: '', amenities: [''] }],
      scholarships: [{ name: '', description: '' }],
      placement_data: [
        {
          year: '',
          total_students_placed: '',
          average_package: '',
          highest_package: '',
          top_recruiters: [''],
          branch_wise: [{ branch: '', students_placed: '' }],
        },
      ],
      alumni_data: [
        {
          name: '',
          graduation_year: '',
          current_position: '',
          achievements: '',
        },
      ],
      other_info: [{ key: '', value: '' }],
    },
  });

  const { fields: contactFields, append: appendContact } = useFieldArray({
    control,
    name: 'contact_details',
  });

  const { fields: feeFields, append: appendFee } = useFieldArray({
    control,
    name: 'fee_structure',
  });

  const { fields: curriculumFields, append: appendCurriculum } = useFieldArray({
    control,
    name: 'curriculum',
  });

  const { fields: seatsFields, append: appendSeats } = useFieldArray({
    control,
    name: 'seats_available',
  });

  const { fields: cutoffFields, append: appendCutoff } = useFieldArray({
    control,
    name: 'past_year_cutoff',
  });

  const { fields: hostelFields, append: appendHostel } = useFieldArray({
    control,
    name: 'hostel_facilities',
  });

  const { fields: scholarshipFields, append: appendScholarship } =
    useFieldArray({
      control,
      name: 'scholarships',
    });

  const { fields: placementFields, append: appendPlacement } = useFieldArray({
    control,
    name: 'placement_data',
  });

  const { fields: alumniFields, append: appendAlumni } = useFieldArray({
    control,
    name: 'alumni_data',
  });

  const { fields: otherFields, append: appendOther } = useFieldArray({
    control,
    name: 'other_info',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 mx-au`to mt-10 space-y-6 max-w-4xl bg-gray-100 rounded-lg shadow-lg"
    >
      <div className="mb-4 text-2xl font-bold">College Information Form</div>

      {/* Basic Information */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Basic Information</div>
        <Input
          {...register('college_name')}
          placeholder="College Name"
          className="p-2 mb-4 rounded border border-gray-300"
        />
        {errors.college_name && (
          <p className="text-red-500">{errors.college_name.message}</p>
        )}
        <Input
          {...register('category')}
          placeholder="Category"
          className="p-2 mb-4 rounded border border-gray-300"
        />
        <Input
          {...register('location')}
          placeholder="Location"
          className="p-2 mb-4 rounded border border-gray-300"
        />
        <Input
          {...register('ranking')}
          placeholder="Ranking"
          className="p-2 mb-4 rounded border border-gray-300"
        />
      </div>

      {/* Contact Details */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Contact Details</div>
        {contactFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Controller
              control={control}
              name={`contact_details.${index}.type`}
              render={({ field }) => (
                <Select
                  {...field}
                  className="mb-2 rounded border border-gray-300"
                >
                  <SelectTrigger placeholder="Select Type" />
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="useful_urls">Useful URLs</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              {...register(`contact_details.${index}.number`)}
              placeholder="Phone Number"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`contact_details.${index}.id`)}
              placeholder="Email ID"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`contact_details.${index}.url`)}
              placeholder="Useful URL"
              className="p-2 mb-2 rounded border border-gray-300"
            />
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => appendContact({ type: 'phone', number: [''] })}
        >
          Add Contact Detail
        </Button>
      </div>

      {/* Fee Structure */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Fee Structure</div>
        {feeFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`fee_structure.${index}.type`)}
              placeholder="Type"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`fee_structure.${index}.amount`)}
              placeholder="Amount"
              className="p-2 mb-2 rounded border border-gray-300"
            />
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => appendFee({ type: '', amount: '' })}
        >
          Add Fee Structure
        </Button>
      </div>

      {/* Curriculum */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Curriculum</div>
        {curriculumFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`curriculum.${index}.type`)}
              placeholder="Type"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`curriculum.${index}.branch`)}
              placeholder="Branch"
              className="p-2 mb-2 rounded border border-gray-300"
            />
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => appendCurriculum({ type: '', branch: '' })}
        >
          Add Curriculum
        </Button>
      </div>

      {/* Seats Available */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Seats Available</div>
        {seatsFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`seats_available.${index}.branch`)}
              placeholder="Branch"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`seats_available.${index}.total_seats`)}
              placeholder="Total Seats"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <div className="ml-4">
              <div className="mb-2 text-sm font-semibold">
                Category-wise Seats
              </div>
              <Controller
                control={control}
                name={`seats_available.${index}.category_wise_seats`}
                render={({ field }) => (
                  <div>
                    {field.value.map((item, catIndex) => (
                      <div
                        key={catIndex}
                        className="mb-4"
                      >
                        <Input
                          {...register(
                            `seats_available.${index}.category_wise_seats.${catIndex}.category`,
                          )}
                          placeholder="Category"
                          className="p-2 mb-2 rounded border border-gray-300"
                        />
                        <Input
                          {...register(
                            `seats_available.${index}.category_wise_seats.${catIndex}.seats`,
                          )}
                          placeholder="Seats"
                          className="p-2 mb-2 rounded border border-gray-300"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="text-white bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        field.onChange([
                          ...field.value,
                          { category: '', seats: '' },
                        ])
                      }
                    >
                      Add Category-wise Seats
                    </Button>
                  </div>
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() =>
            appendSeats({
              branch: '',
              total_seats: '',
              category_wise_seats: [{ category: '', seats: '' }],
            })
          }
        >
          Add Seats Available
        </Button>
      </div>

      {/* Past Year Cutoff */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Past Year Cutoff</div>
        {cutoffFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`past_year_cutoff.${index}.year`)}
              placeholder="Year"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <div className="ml-4">
              <div className="mb-2 text-sm font-semibold">Overall Cutoff</div>
              <Controller
                control={control}
                name={`past_year_cutoff.${index}.overall_cutoff`}
                render={({ field }) => (
                  <div>
                    {field.value.map((item, catIndex) => (
                      <div
                        key={catIndex}
                        className="mb-4"
                      >
                        <Input
                          {...register(
                            `past_year_cutoff.${index}.overall_cutoff.${catIndex}.category`,
                          )}
                          placeholder="Category"
                          className="p-2 mb-2 rounded border border-gray-300"
                        />
                        <Input
                          {...register(
                            `past_year_cutoff.${index}.overall_cutoff.${catIndex}.cutoff`,
                          )}
                          placeholder="Cutoff"
                          className="p-2 mb-2 rounded border border-gray-300"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="text-white bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        field.onChange([
                          ...field.value,
                          { category: '', cutoff: '' },
                        ])
                      }
                    >
                      Add Overall Cutoff
                    </Button>
                  </div>
                )}
              />
            </div>
            <div className="ml-4">
              <div className="mb-2 text-sm font-semibold">
                Branch-wise Cutoff
              </div>
              <Controller
                control={control}
                name={`past_year_cutoff.${index}.branch_wise_cutoff`}
                render={({ field }) => (
                  <div>
                    {field.value.map((item, branchIndex) => (
                      <div
                        key={branchIndex}
                        className="mb-4"
                      >
                        <Input
                          {...register(
                            `past_year_cutoff.${index}.branch_wise_cutoff.${branchIndex}.branch`,
                          )}
                          placeholder="Branch"
                          className="p-2 mb-2 rounded border border-gray-300"
                        />
                        <Input
                          {...register(
                            `past_year_cutoff.${index}.branch_wise_cutoff.${branchIndex}.cutoff`,
                          )}
                          placeholder="Cutoff"
                          className="p-2 mb-2 rounded border border-gray-300"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="text-white bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        field.onChange([
                          ...field.value,
                          { branch: '', cutoff: '' },
                        ])
                      }
                    >
                      Add Branch-wise Cutoff
                    </Button>
                  </div>
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() =>
            appendCutoff({
              year: '',
              overall_cutoff: [{ category: '', cutoff: '' }],
              branch_wise_cutoff: [{ branch: '', cutoff: '' }],
            })
          }
        >
          Add Past Year Cutoff
        </Button>
      </div>

      {/* Hostel Facilities */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Hostel Facilities</div>
        {hostelFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`hostel_facilities.${index}.type`)}
              placeholder="Type"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`hostel_facilities.${index}.availability`)}
              placeholder="Availability"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Textarea
              {...register(`hostel_facilities.${index}.amenities`)}
              placeholder="Amenities"
              className="p-2 mb-2 rounded border border-gray-300"
            />
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() =>
            appendHostel({ type: '', availability: '', amenities: [''] })
          }
        >
          Add Hostel Facility
        </Button>
      </div>

      {/* Scholarships */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Scholarships</div>
        {scholarshipFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`scholarships.${index}.name`)}
              placeholder="Scholarship Name"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Textarea
              {...register(`scholarships.${index}.description`)}
              placeholder="Description"
              className="p-2 mb-2 rounded border border-gray-300"
            />
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => appendScholarship({ name: '', description: '' })}
        >
          Add Scholarship
        </Button>
      </div>

      {/* Placement Data */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Placement Data</div>
        {placementFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`placement_data.${index}.year`)}
              placeholder="Year"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`placement_data.${index}.total_students_placed`)}
              placeholder="Total Students Placed"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`placement_data.${index}.average_package`)}
              placeholder="Average Package"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`placement_data.${index}.highest_package`)}
              placeholder="Highest Package"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <div className="ml-4">
              <div className="mb-2 text-sm font-semibold">Top Recruiters</div>
              <Controller
                control={control}
                name={`placement_data.${index}.top_recruiters`}
                render={({ field }) => (
                  <div>
                    {field.value.map((item, recruiterIndex) => (
                      <Input
                        key={recruiterIndex}
                        {...register(
                          `placement_data.${index}.top_recruiters.${recruiterIndex}`,
                        )}
                        placeholder="Top Recruiter"
                        className="p-2 mb-2 rounded border border-gray-300"
                      />
                    ))}
                    <Button
                      type="button"
                      className="text-white bg-blue-500 hover:bg-blue-600"
                      onClick={() => field.onChange([...field.value, ''])}
                    >
                      Add Top Recruiter
                    </Button>
                  </div>
                )}
              />
            </div>
            <div className="ml-4">
              <div className="mb-2 text-sm font-semibold">
                Branch-wise Placement
              </div>
              <Controller
                control={control}
                name={`placement_data.${index}.branch_wise`}
                render={({ field }) => (
                  <div>
                    {field.value.map((item, branchIndex) => (
                      <div
                        key={branchIndex}
                        className="mb-4"
                      >
                        <Input
                          {...register(
                            `placement_data.${index}.branch_wise.${branchIndex}.branch`,
                          )}
                          placeholder="Branch"
                          className="p-2 mb-2 rounded border border-gray-300"
                        />
                        <Input
                          {...register(
                            `placement_data.${index}.branch_wise.${branchIndex}.students_placed`,
                          )}
                          placeholder="Students Placed"
                          className="p-2 mb-2 rounded border border-gray-300"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="text-white bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        field.onChange([
                          ...field.value,
                          { branch: '', students_placed: '' },
                        ])
                      }
                    >
                      Add Branch-wise Placement
                    </Button>
                  </div>
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() =>
            appendPlacement({
              year: '',
              total_students_placed: '',
              average_package: '',
              highest_package: '',
              top_recruiters: [''],
              branch_wise: [{ branch: '', students_placed: '' }],
            })
          }
        >
          Add Placement Data
        </Button>
      </div>

      {/* Alumni Data */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Alumni Data</div>
        {alumniFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`alumni_data.${index}.name`)}
              placeholder="Name"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`alumni_data.${index}.graduation_year`)}
              placeholder="Graduation Year"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Input
              {...register(`alumni_data.${index}.current_position`)}
              placeholder="Current Position"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Textarea
              {...register(`alumni_data.${index}.achievements`)}
              placeholder="Achievements"
              className="p-2 mb-2 rounded border border-gray-300"
            />
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() =>
            appendAlumni({
              name: '',
              graduation_year: '',
              current_position: '',
              achievements: '',
            })
          }
        >
          Add Alumni Data
        </Button>
      </div>

      {/* Other Information */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-lg font-semibold">Other Information</div>
        {otherFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-4"
          >
            <Input
              {...register(`other_info.${index}.key`)}
              placeholder="Key"
              className="p-2 mb-2 rounded border border-gray-300"
            />
            <Textarea
              {...register(`other_info.${index}.value`)}
              placeholder="Value"
              className="p-2 mb-2 rounded border border-gray-300"
            />
          </div>
        ))}
        <Button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => appendOther({ key: '', value: '' })}
        >
          Add Other Information
        </Button>
      </div>

      <Button
        type="submit"
        className="text-white bg-green-500 hover:bg-green-600"
      >
        Submit
      </Button>
    </form>
  );
};

export default CollegeForm;
